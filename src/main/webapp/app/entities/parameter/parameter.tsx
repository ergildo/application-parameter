import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './parameter.reducer';
import { IParameter } from 'app/shared/model/parameter.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IParameterProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Parameter extends React.Component<IParameterProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { parameterList, match } = this.props;
    return (
      <div>
        <h2 id="parameter-heading">
          Parameters
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Parameter
          </Link>
        </h2>
        <div className="table-responsive">
          {parameterList && parameterList.length > 0 ? (
            <Table responsive aria-describedby="parameter-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Value</th>
                  <th>Enable</th>
                  <th>Application</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {parameterList.map((parameter, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${parameter.id}`} color="link" size="sm">
                        {parameter.id}
                      </Button>
                    </td>
                    <td>{parameter.name}</td>
                    <td>{parameter.description}</td>
                    <td>{parameter.value}</td>
                    <td>{parameter.enable ? 'true' : 'false'}</td>
                    <td>
                      {parameter.application ? <Link to={`application/${parameter.application.id}`}>{parameter.application.name}</Link> : ''}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${parameter.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${parameter.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${parameter.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Parameters found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ parameter }: IRootState) => ({
  parameterList: parameter.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Parameter);
