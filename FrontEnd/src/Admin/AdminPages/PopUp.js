import React from 'react';
import AddCategoryPage from './AddCategoryPage'
class Popup extends React.Component {
  constructor(props) {
    super(props)
    this.closePopup = this.closePopup.bind(this);
  }
  closePopup() {
    this.props.closePopup()
  }

  render() {

    return (
      <div className='popup'>
        <div className='popup_inner'>
          <AddCategoryPage closePopup={this.closePopup.bind(this)} />
        </div>
      </div>
    );
  }
}
export default Popup;