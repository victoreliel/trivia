import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, imgSrc, score } = this.props;
    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${imgSrc}` } alt="User avatar" />
          <p data-testid="header-player-name">
            {name}
          </p>
          <p data-testid="header-score">
            { score }
          </p>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.user.name,
  imgSrc: state.player.user.imgSrc,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(Header);
