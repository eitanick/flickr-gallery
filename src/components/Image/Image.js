import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './Image.scss';

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
	this.onClick = this.onClick.bind(this);
	this.rotate = this.rotate.bind(this);
    this.state = {
      size: 200,
	  deleted:false,
	  rotation: 0
    };
  }

  calcImageSize() {
    const {galleryWidth} = this.props;
    const targetSize = 200;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = (galleryWidth / imagesPerRow);
    this.setState({
      size
    });
  }

   rotate(){
    let newRotation = this.state.rotation + 90;
    if(newRotation >= 360){
      newRotation =- 360;
    }
    this.setState({
      rotation: newRotation
    })
  }
  
  componentDidMount() {
    this.calcImageSize();
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }
  
  
  onClick(){
    this.setState({
      deleted:true,
	  size:0
    });
  }
	
  render() {
    const isDeleted = this.state.deleted;
	const { rotation } =  this.state;
    let img = null;
    if (isDeleted) {
      img = <div className="image-root"
        style={{
          width: this.state.size + 'px',
          height: this.state.size + 'px'
        }}></div>;
    } else {
      img = <div
        
        >
        <div>
          <FontAwesome className="image-icon" name="sync-alt" title="rotate" onClick={this.rotate}/>
          <FontAwesome className="image-icon" name="trash-alt" title="delete" onClick={this.onClick}/>
          <FontAwesome className="image-icon" name="expand" title="expand"/>
        </div>
      </div>;
    }

    return (
      <div className="image-root"
        style={{
          backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
		  transform: `rotate(${rotation}deg)`,
          width: this.state.size + 'px',
          height: this.state.size + 'px'
        }}>
        {img}
      </div>
    );
  }
}

export default Image;

