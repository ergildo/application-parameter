import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IApplication } from 'app/shared/model/application.model';
import { getEntities as getApplications } from 'app/entities/application/application.reducer';
import { getEntity, updateEntity, createEntity, reset } from './parameter.reducer';
import { IParameter } from 'app/shared/model/parameter.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IParameterUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IParameterUpdateState {
  isNew: boolean;
  applicationId: string;
}

export class ParameterUpdate extends React.Component<IParameterUpdateProps, IParameterUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      applicationId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getApplications();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { parameterEntity } = this.props;
      const entity = {
        ...parameterEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/parameter');
  };

  render() {
    const { parameterEntity, applications, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="applicationParameterApp.parameter.home.createOrEditLabel">Create or edit a Parameter</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : parameterEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="parameter-id">ID</Label>
                    <AvInput id="parameter-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="parameter-name">
                    Name
                  </Label>
                  <AvField id="parameter-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="parameter-description">
                    Description
                  </Label>
                  <AvField id="parameter-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="valueLabel" for="parameter-value">
                    Value
                  </Label>
                  <AvField id="parameter-value" type="text" name="value" />
                </AvGroup>
                <AvGroup>
                  <Label id="enableLabel" check>
                    <AvInput id="parameter-enable" type="checkbox" className="form-control" name="enable" />
                    Enable
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="parameter-application">Application</Label>
                  <AvInput id="parameter-application" type="select" className="form-control" name="application.id">
                    <option value="" key="0" />
                    {applications
                      ? applications.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/parameter" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  applications: storeState.application.entities,
  parameterEntity: storeState.parameter.entity,
  loading: storeState.parameter.loading,
  updating: storeState.parameter.updating,
  updateSuccess: storeState.parameter.updateSuccess
});

const mapDispatchToProps = {
  getApplications,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParameterUpdate);
