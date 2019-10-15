import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './application.reducer';
import { IApplication } from 'app/shared/model/application.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApplicationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Application extends React.Component<IApplicationProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { applicationList, match } = this.props;
    return (
      <div>
        <h2 id="application-heading">
          Applications
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Application
          </Link>
        </h2>
        <div className="table-responsive">
          {applicationList && applicationList.length > 0 ? (
            <Table responsive aria-describedby="application-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Descriptiom</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {applicationList.map((application, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${application.id}`} color="link" size="sm">
                        {application.id}
                      </Button>
                    </td>
                    <td>{application.name}</td>
                    <td>{application.descriptiom}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${application.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${application.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${application.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Applications found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ application }: IRootState) => ({
  applicationList: application.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application);
