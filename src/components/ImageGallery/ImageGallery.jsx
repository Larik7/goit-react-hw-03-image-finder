import { Component } from 'react'
import PropTypes from 'prop-types';
import { GalleryList } from './ImageGallery.style';

export class ImageGallery extends Component {
    state = {
        images: [],
        page: 1,
        Loading: false,
        error: null,
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.imageSearch !== this.props.imageSearch) {
            // console.log('изменилось');
            // console.log('prevProps.imageSearch: ', prevProps.imageSearch);
            // console.log('this.props.imageSearch: ', this.props.imageSearch);

            this.setState({ Loading: true });
            fetch('https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12').then(response => response.json()).then(images => this.setState({ images })).finally(() => this.setState({Loading: false}));
        }
    }
    render() {
        return (
            <div>
                <GalleryList>
                    {this.state.images && <li>{this.state.images.images}</li>}
                </GalleryList>
            </div>
        )    
    }
}