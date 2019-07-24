import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import {
  Loading,
  Owner,
  IssueList,
  FilterBox,
  FilterButton,
  PaginationBox,
  PaginationButton,
} from './styles';

import Container from '../../components/Container';

class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    filter: 'open',
    loadingFilter: false,
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { page } = this.state;
    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  handleIssues = async (filter, page) => {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    this.setState({
      loadingFilter: true,
      filter,
    });

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filter,
        page,
      },
    });

    this.setState({
      issues: issues.data,
      loadingFilter: false,
      filter,
      page,
    });
  };

  render() {
    const {
      repository,
      issues,
      loading,
      filter,
      loadingFilter,
      page,
    } = this.state;

    if (loading) {
      return <Loading>Loading</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Go back to repositories</Link>

          <img src={repository.owner.avatar_url} alt={repository.owner.login} />

          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <FilterBox>
          <FilterButton
            onClick={() => this.handleIssues('all', page)}
            loading={loadingFilter ? 1 : 0}
            filter="all"
            selected={filter === 'all'}
          >
            {loadingFilter ? <FaSpinner color="FFF" size={14} /> : 'All'}
          </FilterButton>
          <FilterButton
            onClick={() => this.handleIssues('open', page)}
            loading={loadingFilter ? 1 : 0}
            filter="open"
            selected={filter === 'open'}
          >
            {loadingFilter ? <FaSpinner color="FFF" size={14} /> : 'Open'}
          </FilterButton>
          <FilterButton
            onClick={() => this.handleIssues('closed', page)}
            loading={loadingFilter ? 1 : 0}
            filter="closed"
            selected={filter === 'closed'}
          >
            {loadingFilter ? <FaSpinner color="FFF" size={14} /> : 'Closed'}
          </FilterButton>
        </FilterBox>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>

                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <PaginationBox>
          <PaginationButton
            onClick={() => this.handleIssues(filter, page - 1)}
            type="prev"
            page={page}
          >
            Previous Page
          </PaginationButton>
          <PaginationButton
            onClick={() => this.handleIssues(filter, page + 1)}
            type="next"
            page={page}
          >
            Next Page
          </PaginationButton>
        </PaginationBox>
      </Container>
    );
  }
}
export default Repository;
