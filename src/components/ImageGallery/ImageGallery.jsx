import { Component } from 'react'
import PropTypes from 'prop-types';
import { GalleryList } from './ImageGallery.style';

export class ImageGallery extends Component {

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.imageSearch !== this.props.imageSearch) {
            console.log('изменилось');
            console.log('prevProps.imageSearch: ', prevProps.imageSearch);
            console.log('this.props.imageSearch: ', this.props.imageSearch);
        }
    }
    render() {
        return (
            <div>
                <GalleryList>
                    <li>{this.props.imageSearch}</li>
                </GalleryList>
            </div>
        )    
    }
}