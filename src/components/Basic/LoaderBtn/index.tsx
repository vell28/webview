import * as React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';

import { getLoader } from '@/selectors/ui';
import { injectIntl } from 'react-intl';
import './style.less';

const mapStateToProps = state => ({
  loaders: getLoader(state)
})
 
const LoaderBtn = (props) => {
  const { 
    name, loaders, url, text, classname, intl, onClick 
  } = props;

  const loader = loaders.find(item => item === name);
  const message = intl.messages[ R.path([ 'props', 'message', 'id' ], text)];

  return (
    <>
      {!url 
        ?
        <button
          className={classname}
          onClick={onClick}
          disabled={ !!loader }
        >
          { loader && <span className="loader-helper" /> }

          <span className={`${loader ? 'loader' : 'loader hide'}`} />

          { message }
        </ button>
        :
        <a
          className={classname}
          onClick={onClick}
          href={url}
        >
          { loader && <span className="loader-helper" /> }

          <span className={`${loader ? 'loader' : 'loader hide'}`} />

          { message }
        </ a>
        }
    </>
  )
}

const inject = React.memo(injectIntl(LoaderBtn));

export default connect(mapStateToProps, {})(inject);
