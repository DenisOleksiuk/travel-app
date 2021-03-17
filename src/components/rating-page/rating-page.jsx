import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setShowAuth, fetchShowplace } from '../../action';
import {ShowplaceService} from '../../services';
import style from './rating-page.module.scss';

const showplaceService = new ShowplaceService;

const RatingPage = (props) => {
    const { currentUser, currentCounrty, setShowAuthAction, fetchShowplaceAction, index, rate } = props;
    const { _id } = currentCounrty; 

    return (
        <div className = {style.ratingWrapper}>
          <div className = {style.ratingButtonWrapper}>
            {[1,2,3,4,5].map((i) => (
              <button key = {`${_id}${i}`}
                onClick = {() => {
                if (currentUser) {
                  showplaceService.rate(_id, index, currentUser, i).then(() => { 
                  fetchShowplaceAction(showplaceService);
                });
                } else {
                  setShowAuthAction(true);
                }
              }}
              type="button">{i}</button>
            ))}
          </div>
          <div className = {style.ratingMarksWrapper}>
            {rate.map(({_id: id, user, rating}) => (
              <span key={id}>{`${user}: ${rating}`}</span>
            ))}
          </div>
        </div>
    )
}

RatingPage.propTypes = {
    currentCounrty: PropTypes.objectOf(PropTypes.any).isRequired,
    currentUser:PropTypes.string,
    setShowAuthAction: PropTypes.func.isRequired,
    fetchShowplaceAction: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    rate: PropTypes.arrayOf(PropTypes.any).isRequired
  }
  
  RatingPage.defaultProps = {
    currentUser: null
  }


const mapStateToProps = ({
    showplacesList: { currentUser },
  }) => ({ currentUser });
  
  const mapDispatchToProps = (dispatch) => ({
    setShowAuthAction: (value) => dispatch(setShowAuth(value)), // [1]
    fetchShowplaceAction: fetchShowplace(dispatch)
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(RatingPage);