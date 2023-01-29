import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from 'components/Modal/modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.modalClose);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.modal);
  }

  modalClose = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.close();
    }
  };
  render() {
    const { urlImg } = this.props;
    return createPortal(
      <div className={css.overlay} onClick={this.modalClose}>
        <div className={css.modal}>
          <img src={urlImg} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
