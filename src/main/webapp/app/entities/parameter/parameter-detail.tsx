import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './parameter.reducer';
import { IParameter } from 'app/shared/model/parameter.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IParameterDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ParameterDetail extends React.Component<IParameterDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { parameterEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Parameter [<b>{parameterEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{parameterEntity.name}</dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{parameterEntity.description}</dd>
            <dt>
              <span id="value">Value</span>
            </dt>
            <dd>{parameterEntity.value}</dd>
            <dt>
              <span id="enable">Enable</span>
            </dt>
            <dd>{parameterEntity.enable ? 'true' : 'false'}</dd>
            <dt>Application</dt>
            <dd>{parameterEntity.application ? parameterEntity.application.name : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/parameter" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/parameter/${parameterEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ parameter }: IRootState) => ({
  parameterEntity: parameter.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParameterDetail);
