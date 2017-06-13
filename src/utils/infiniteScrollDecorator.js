import React, { Component } from 'react';
import throttle from './throttle';

export default function infiniteScrollDecorator( WrappedComponent ) {
    return class InfiniteScrollDecorated extends Component {
        static defaultProps = {
            bottomOffset: 2500,
        }

        componentDidMount() {
            window.addEventListener('scroll', this.handleOnScroll)
        }

        componentWillUnmount() {
            window.removeEventListener('scroll', this.handleOnScroll);
        }

        @throttle( 500 )
        handleOnScroll() {
            const { onFetchMore, bottomOffset } = this.props;

            if( typeof onFetchMore !== 'function' ) return

            const { body, documentElement } = document;

            const scrollTop = window.pageYOffset !== undefined
                ? window.pageYOffset
                : ( document.documentElement
                    || document.body.parentNode
                    || document.body
                ).scrollTop

            const pageHeight = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                documentElement.clientHeight,
                documentElement.scrollHeight,
                documentElement.offsetHeight
            );

            const offset = pageHeight - scrollTop;

            if( offset < bottomOffset) {
                onFetchMore();
            }
        }

        render() {
            const {
                onFetchMore,
                bottomOffset,
                hasMore,
                ...wrappedProps
            } = this.props

            return <WrappedComponent {...wrappedProps} />
        }
    }
}
