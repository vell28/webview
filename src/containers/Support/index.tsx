import * as React from 'react';
import { connect } from 'react-redux';

import { Support as SupportComponent } from '@/components';
import { getVersion } from '@/selectors/support';
import { getLoaderAction } from '@/actions';
import { getLoader } from '@/selectors/ui';
import './style.less';

const mapStateToProps = (state) => ({
  version: getVersion(state),
  loaders: getLoader(state)
})

const mapDispatchToProps = ({
  getLoaderAction,
})

const Support: React.FunctionComponent<any> = (props) => {

  const [ value, setValue ] = React.useState('');

  const { version, loaders, getLoaderAction } = props;

  const loader = loaders.find(item => item === 'support');

  React.useEffect(() => {

    if(!!value) {

      !loader && setValue('');
    }
  },              [ loaders ])

  const handlerFeedback = (e) => {
    setValue(e.target.value);
  }

  const onSubmitFeedback = () => {
    if (value.length > 0) {
      getLoaderAction('support');
    }
  }

  return (
    <SupportComponent 
      version={version}
      value={value}
      handlerFeedback={handlerFeedback}
      onSubmitFeedback={onSubmitFeedback}
      loader={loader}
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Support);
