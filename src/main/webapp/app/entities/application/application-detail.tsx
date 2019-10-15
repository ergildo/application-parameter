import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './application.reducer';
import { IApplication } from 'app/shared/model/application.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApplicationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ApplicationDetail extends React.Component<IApplicationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { applicationEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Application [<b>{applicationEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{applicationEntity.name}</dd>
            <dt>
              <span id="descriptiom">Descriptiom</span>
            </dt>
            <dd>{applicationEntity.descriptiom}</dd>
          </dl>
          <Button tag={Link} to="/entity/application" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/application/${applicationEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ application }: IRootState) => ({
  applicationEntity: application.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationDetail);
