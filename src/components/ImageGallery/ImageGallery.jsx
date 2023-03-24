import { Component } from 'react'
import PropTypes from 'prop-types';
import { fetchPixabayApi } from '../service/API';
import { GalleryList, ErrorMessage, ListItem } from './ImageGallery.style';
import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { LoadMore } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

'idel'
'pending'
'resolve'
'rejected'

export class ImageGallery extends Component {
    state = {
        images: [],
        page: 1,
        Loading: false,
        error: null,
        status: 'idel',
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.imageSearch !== this.props.imageSearch) {
            // console.log('изменилось');
            // console.log('prevProps.imageSearch: ', prevProps.imageSearch);
            // console.log('this.props.imageSearch: ', this.props.imageSearch);

            this.setState({ status: 'pending'});
            fetch('https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12')
                .then(response => response.json())
                .then(images => this.setState({ images }))
                .finally(() => this.setState({ Loading: false }));
        }
    }

     componentDidUpdate(prevProps, prevState) {

        if (prevProps.value !== this.props.value) {
            this.setState({ images: [], page: 1 });
            this.fetchImages();

        }

        if (prevState.page < this.state.page) {
            this.fetchImages();      
        }
    }

    fetchImages = async () => {   
        try {
            this.setState({ isLoading: true });
            const resp = await fetchPixabayApi(this.props.value.trim(), this.state.page);

            if (!resp || resp.hits.length === 0) {
                this.setState({
                    error: 'Sorry, there are no images matching your search query. Please try again.'
                })
                return
            }
            

            this.setState({
                images: [...this.state.images, ...resp.hits],
                error: null
            })
            this.setState({hits: resp.totalHits})
            }
            catch (err) {
                this.setState({ error: String(err) });
            }
            finally {
                this.setState({ isLoading: false });
            }
        }
    

    loadMore = () => {
		this.setState((prevState) => ({ page: prevState.page + 1 }))
    }

    render() {

        if (status === 'idel') {
            return <h2>Что искать?</h2>
        }

        if (status === 'pending') {
            return <div>Loading</div>
        }

        if (status === 'rejected') {
            return <h2>{error.message}</h2>
        }

        if (status === 'resolve') {
            return <div>
                <GalleryList>
                    {this.state.images && <li>{this.state.images.images}</li>}
                </GalleryList>
            </div>
        }
        
    }
}