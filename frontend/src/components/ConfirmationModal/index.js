import {Modal,Box} from '@mui/material';
import styles from "./index.module.css"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#162446',
  border: '1px solid #C23893',
  boxShadow: 24,
  p: 4,
};

export default function ConfirmationModal({open,setOpen,fromNetwork,toNetwork}) {
    return (
        <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className={styles.modal_container}>
                <h2>Confirm Transcation</h2>
                <div className={styles.details_container}>
                    <span>From: <b>{fromNetwork}</b></span>
                    <span>To: <b>{toNetwork}</b></span>
                    <span><b>Selected Tokens</b></span>
                </div>
            </div>
        </Box>
      </Modal>
    );
}