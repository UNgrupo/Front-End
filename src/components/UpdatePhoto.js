import React, { Component } from 'react';

export default class UpdatePhoto extends Component{

    constructor(props){
        super(props);

        this.uploadWidget = this.uploadWidget.bind(this);
    }

    uploadWidget() {

        const { callback, context } = this.props;

        window.cloudinary.setAPIKey('541149863476823');
        window.cloudinary.openUploadWidget({ 
            cloud_name: 'dvuxpp54w',
            api_key: 't0XHU8BfI7mDANMDrgQdx8C2hE0',
            upload_preset: 'ungrupo',
            folder: 'Ungrupo',
            sources: [
                'local',
                'url',
                'camera',
                'image_search',
                'facebook',
                'dropbox',
                'instagram'
            ],
            googleApiKey: '<image_search_google_api_key>',
            showAdvancedOptions: true,
            cropping: true,
            multiple: false,
            defaultSource: 'local',
            styles: {
                palette: {
                    window: '#FFFFFF',
                    windowBorder: '#90A0B3',
                    tabIcon: '#0078FF',
                    menuIcons: '#5A616A',
                    textDark: '#000000',
                    textLight: '#FFFFFF',
                    link: '#0078FF',
                    action: '#D84C00',
                    inactiveTabIcon: '#0E2F5A',
                    error: '#F44235',
                    inProgress: '#0078FF',
                    complete: '#20B832',
                    sourceBg: '#E4EBF1'
                },
                fonts: {
                    default: {
                        active: true
                    }
                }
            }
        },

        async function(error, result) {

            if(error){
                console.log(error);
                return ;
            }

            callback(result, context);
        });
    }
    
    render(){

        const { buttonText, css } = this.props;

        return(
            <button defaultValue={ buttonText } className={'btn ' + css} id='btnChangePicture' onClick={this.uploadWidget}>{buttonText}</button>
        );
    }

}

UpdatePhoto.defaultProps = {
    callback: () => {},
    buttonText: 'Upload',
    css: 'btn-secondary'
};