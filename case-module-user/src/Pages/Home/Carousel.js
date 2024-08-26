import sport from '../../assets/Carousel/Sport.png'
import technology from '../../assets/Carousel/Technology.png'
import travel from '../../assets/Carousel/Travel.png'
import education from '../../assets/Carousel/Education.png'
import art from '../../assets/Carousel/Art.png'
export default function Carousel(){
    return(
        <div className='container-carousel'>
            <div className="uk-position-relative uk-visible-toggle uk-light" tabIndex="-1"
                 uk-slider="clsActivated: uk-transition-active; center: true; autoplay: true">
                
                <div className="uk-slider-items uk-grid">
                    <div className="uk-width-3-4">
                        <div className="uk-panel">
                            <img src={sport} width="1800" height="1200" alt=""/>
                            <div
                                className="uk-overlay uk-overlay-primary uk-position-bottom uk-text-center uk-transition-slide-bottom">
                                <h3 className="uk-margin-remove">Sports</h3>
                            </div>
                        </div>
                    </div>
                    <div className="uk-width-3-4">
                        <div className="uk-panel">
                            <img src={technology} width="1800" height="1200" alt=""/>
                            <div
                                className="uk-overlay uk-overlay-primary uk-position-bottom uk-text-center uk-transition-slide-bottom">
                                <h3 className="uk-margin-remove">Technology</h3>
                            </div>
                        </div>
                    </div>
                    <div className="uk-width-3-4">
                        <div className="uk-panel">
                            <img src={travel} width="1800" height="1200" alt=""/>
                            <div
                                className="uk-overlay uk-overlay-primary uk-position-bottom uk-text-center uk-transition-slide-bottom">
                                <h3 className="uk-margin-remove">Travel</h3>
                            </div>
                        </div>
                    </div>
                    <div className="uk-width-3-4">
                        <div className="uk-panel">
                            <img src={education} width="1800" height="1200" alt=""/>
                            <div
                                className="uk-overlay uk-overlay-primary uk-position-bottom uk-text-center uk-transition-slide-bottom">
                                <h3 className="uk-margin-remove">Education</h3>
                            </div>
                        </div>
                    </div>
                    <div className="uk-width-3-4">
                        <div className="uk-panel">
                            <img src={art} width="1800" height="1200" alt=""/>
                            <div
                                className="uk-overlay uk-overlay-primary uk-position-bottom uk-text-center uk-transition-slide-bottom">
                                <h3 className="uk-margin-remove">Art</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <a className="uk-position-center-left uk-position-small uk-hidden-hover" href uk-slidenav-previous uk-slider-item="previous"></a>
                <a className="uk-position-center-right uk-position-small uk-hidden-hover" href uk-slidenav-next uk-slider-item="next"></a>
            </div>
        </div>
    )
}