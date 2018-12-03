import React, { Component } from 'react';

import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';

export default class CarouselComp extends Component{

    constructor(props){
        super(props);

        this.state = {
            activeIndex: 0
        };

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }
    
    onExited() {
        this.animating = false;
    }
    
    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.props.photos.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }
    
    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.props.photos.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }
    
    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render(){

        const { height, photos, captionText, captionHeader } = this.props;

        const { activeIndex } = this.state;

        const slides = photos.map( ( photo, i ) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={photo.urls.regular}
                >
                    <img height={height} className='d-block w-100' src={photo.urls.regular} alt='First slide' />
                    <CarouselCaption captionText={captionText[i]} captionHeader={captionHeader[i]} cssModule={{color: '#AAAAAA'}} />
                </CarouselItem>
            );
        });

        return(
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
            >
                <CarouselIndicators items={photos.map( photo => { return {src: photo.id}} )} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction='prev' directionText='Previous' onClickHandler={this.previous} />
                <CarouselControl direction='next' directionText='Next' onClickHandler={this.next} />
            </Carousel>
        );
    }

}