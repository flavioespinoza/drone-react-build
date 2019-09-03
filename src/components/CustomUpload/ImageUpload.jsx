import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";
import Button from "components/CustomButtons/Button.jsx";
import PropTypes from "prop-types";
import React from "react";

const log = require ('ololog')

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage
    };
  }
  fileInput = React.createRef();
  handleImageChange = e => {
    e.preventDefault();
    const reader = new FileReader();
		const file = e.target.files[0];
    reader.onloadend = () => {
			console.log(reader)
			console.log(file)		
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  };
  handleSubmit = e => {
    e.preventDefault();
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  };
  handleClick = () => {
    this.fileInput.current.click();
  };
  handleRemove = () => {
    this.setState({
      file: null,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage
    });
    this.fileInput.current.value = null;
  };
  render() {
    var {
      avatar,
      addButtonProps,
      changeButtonProps,
      removeButtonProps
    } = this.props;
    return (
      <div className="fileinput text-center">
        <input
          type="file"
          onChange={this.handleImageChange}
          ref={this.fileInput}
        />
        <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
          <img src={this.state.imagePreviewUrl} alt="..." />
        </div>
        <div>
          {this.state.file === null ? (
            <Button {...addButtonProps} onClick={() => this.handleClick()}>
              {avatar ? "Add Photo" : "Select Document"}
            </Button>
          ) : (
            <span>
              <Button {...changeButtonProps} onClick={() => this.handleClick()}>
                Change
              </Button>
              {avatar ? <br /> : null}
              <Button
                {...removeButtonProps}
                onClick={() => this.handleRemove()}
              >
                <i className="fas fa-times" /> Remove
              </Button>
            </span>
          )}
        </div>
      </div>
    );
  }
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
  addButtonProps: PropTypes.object,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object
};

export default ImageUpload;
