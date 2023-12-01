// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

/// @title - A simple contract for transferring tokens across chains.
contract TokenTransferor is OwnerIsCreator {
    // Custom errors to provide more descriptive revert messages.
    error NotEnoughBalance(uint256 currentBalance, uint256 calculatedFees); // Used to make sure contract has enough balance to cover the fees.
    error NothingToWithdraw(); // Used when trying to withdraw Ether but there's nothing to withdraw.
    error FailedToWithdrawEth(address owner, address target, uint256 value); // Used when the withdrawal of Ether fails.
    error DestinationChainNotAllowlisted(uint64 destinationChainSelector); // Used when the destination chain has not been allowlisted by the contract owner.
    // Event emitted when the tokens are transferred to an account on another chain.
    event TokensTransferred(
        bytes32[] indexed messageId, // The unique ID of the message.
        uint64 indexed destinationChainSelector, // The chain selector of the destination chain.
        address receiver, // The address of the receiver on the destination chain.
        address[] tokens, // The token address that was transferred.
        uint256[] tokenAmounts, // The token amount that was transferred.
        address feeToken, // the token address used to pay CCIP fees.
        uint256 fees // The fees paid for sending the message.
    );

    // Mapping to keep track of allowlisted destination chains.
    mapping(uint64 => bool) public allowlistedChains;

    IRouterClient private s_router;

    IERC20 private s_linkToken;

    uint256 public platformFee;

    /// @notice Constructor initializes the contract with the router address.
    /// @param _router The address of the router contract.
    /// @param _link The address of the link contract.
    constructor(address _router, address _link, uint256 _fees) {
        s_router = IRouterClient(_router);
        s_linkToken = IERC20(_link);
        platformFee=_fees;
    }

    /// @dev Modifier that checks if the chain with the given destinationChainSelector is allowlisted.
    /// @param _destinationChainSelector The selector of the destination chain.
    modifier onlyAllowlistedChain(uint64 _destinationChainSelector) {
        if (!allowlistedChains[_destinationChainSelector])
            revert DestinationChainNotAllowlisted(_destinationChainSelector);
        _;
    }

    /// @dev Updates the allowlist status of a destination chain for transactions.
    /// @notice This function can only be called by the owner.
    /// @param _destinationChainSelector The selector of the destination chain to be updated.
    /// @param allowed The allowlist status to be set for the destination chain.
    function allowlistDestinationChain(
        uint64 _destinationChainSelector,
        bool allowed
    ) external onlyOwner {
        allowlistedChains[_destinationChainSelector] = allowed;
    }

    function calculateFee(uint256 _amount) public view returns (uint256) {
        uint percentageAmount=(_amount*platformFee)/10000;
        return _amount-percentageAmount;
    }

    /// @notice Transfer tokens to receiver on the destination chain.
    /// @notice Pay in native gas such as ETH on Ethereum or MATIC on Polgon.
    /// @notice the token must be in the list of supported tokens.
    /// @notice This function can only be called by the owner.
    /// @dev Assumes your contract has sufficient native gas like ETH on Ethereum or MATIC on Polygon.
    /// @param _destinationChainSelector The identifier (aka selector) for the destination blockchain.
    /// @param _receiver The address of the recipient on the destination blockchain.
    /// @param _tokens token address.
    /// @param _amounts token amount.
    /// @return messageId The ID of the message that was sent.
    function transferTokensPayNative(
        uint64 _destinationChainSelector,
        address _receiver,
        address[] calldata _tokens,
        uint256[] calldata _amounts
    )
        external
        payable
        onlyAllowlistedChain(_destinationChainSelector)
        returns (bytes32[] memory)
    {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        // address(0) means fees are paid in native gas
        // Client.EVM2AnyMessage[]
        //     memory evm2AnyMessages = _buildCCIPMessagesArray(_receiver,_tokens,_amounts);
        Client.EVM2AnyMessage[]
            memory evm2AnyMessages = new Client.EVM2AnyMessage[](_tokens.length);
        for(uint i=0;i<_tokens.length;i++){
            evm2AnyMessages[i]=_buildCCIPMessage(
            _receiver,
            _tokens[i],
            calculateFee(_amounts[i]),
            address(0)
        );
        }

        // Get the fee required to send the message
        // console.log("evm2AnyMessages length is: ");
        // console.log(evm2AnyMessages.length);
        uint256 fees = 0;
        uint256[] memory tokenTransferFees = new uint256[](_tokens.length);
        for (uint256 i = 0; i < evm2AnyMessages.length; i++) {
            uint256 currentFee=s_router.getFee(
                _destinationChainSelector,
                evm2AnyMessages[i]
            );
            fees += currentFee;
            tokenTransferFees[i]=currentFee;
        }

        if (fees >msg.value){
            console.log("in iff block");
            revert NotEnoughBalance(msg.value, fees);
        }

        // transfer user tokens to this contract after user has approved
        for (uint256 i = 0; i < _tokens.length; i++) {
            IERC20(_tokens[i]).transferFrom(
                msg.sender,
                address(this),
                _amounts[i]
            );
        }
        for (uint256 i = 0; i < _tokens.length; i++) {
            IERC20(_tokens[i]).approve(address(s_router), calculateFee(_amounts[i]));
        }

        // Send the message through the router and store the returned message ID
        bytes32[] memory messageId = new bytes32[](evm2AnyMessages.length);
        for (uint256 i = 0; i < evm2AnyMessages.length; i++) {
            messageId[i] = s_router.ccipSend{value: tokenTransferFees[i]}(
                _destinationChainSelector,
                evm2AnyMessages[i]
            );
        }

        // Emit an event with message details
        emit TokensTransferred(
            messageId,
            _destinationChainSelector,
            _receiver,
            _tokens,
            _amounts,
            address(0),
            fees
        );

        // Return the message ID
        return messageId;
    }

    function _buildCCIPMessagesArray(
        address _receiver,
        address[] calldata _tokens,
        uint256[] calldata _amounts
    ) internal pure returns (Client.EVM2AnyMessage[] memory) {

            Client.EVM2AnyMessage[]
            memory evm2AnyMessages = new Client.EVM2AnyMessage[](
                _tokens.length
            );

            for(uint i=0;i<_tokens.length;i++){
                evm2AnyMessages[i] = _buildCCIPMessage(
                _receiver,
                _tokens[i],
                _amounts[i],
                address(0)
            );
            }
            return evm2AnyMessages;
    }

    function getTotalTranscationFees(
        uint64 _destinationChainSelector,
        address _receiver,
        address[] calldata _tokens,
        uint256[] calldata _amounts
    ) public view returns (uint256) {
        Client.EVM2AnyMessage[]
            memory evm2AnyMessages = _buildCCIPMessagesArray(_receiver,_tokens,_amounts);
        uint256 fees = 0;
        for (uint256 i = 0; i < evm2AnyMessages.length; i++) {
            fees += s_router.getFee(
                _destinationChainSelector,
                evm2AnyMessages[i]
            );
        }
        return fees;
    }

    /// @notice Construct a CCIP message.
    /// @dev This function will create an EVM2AnyMessage struct with all the necessary information for tokens transfer.
    /// @param _receiver The address of the receiver.
    /// @param _token The token to be transferred.
    /// @param _amount The amount of the token to be transferred.
    /// @param _feeTokenAddress The address of the token used for fees. Set address(0) for native gas.
    /// @return Client.EVM2AnyMessage Returns an EVM2AnyMessage struct which contains information for sending a CCIP message.
    function _buildCCIPMessage(
        address _receiver,
        address _token,
        uint256 _amount,
        address _feeTokenAddress
    ) internal pure returns (Client.EVM2AnyMessage memory) {
        // Set the token amounts
        Client.EVMTokenAmount[]
            memory tokenAmounts = new Client.EVMTokenAmount[](1);
        tokenAmounts[0] = Client.EVMTokenAmount({
            token: _token,
            amount: _amount
        });

        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        return
            Client.EVM2AnyMessage({
                receiver: abi.encode(_receiver), // ABI-encoded receiver address
                data: "", // No data
                tokenAmounts: tokenAmounts, // The amount and type of token being transferred
                extraArgs: Client._argsToBytes(
                    // Additional arguments, setting gas limit to 0 as we are not sending any data and non-strict sequencing mode
                    Client.EVMExtraArgsV1({gasLimit: 0, strict: false})
                ),
                // Set the feeToken to a feeTokenAddress, indicating specific asset will be used for fees
                feeToken: _feeTokenAddress
            });
    }

    /// @notice Fallback function to allow the contract to receive Ether.
    /// @dev This function has no function body, making it a default function for receiving Ether.
    /// It is automatically called when Ether is transferred to the contract without any data.
    receive() external payable {}
}