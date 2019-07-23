import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import api from '../../services/api';

import { Loading, Owner, IssueList, FilterBox, FilterButton } from './styles';

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
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  handleFilter = async filter => {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    this.setState({
      loading: true,
    });

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filter,
        per_page: 5,
      },
    });

    this.setState({
      issues: issues.data,
      loading: false,
      filter,
    });
  };

  render() {
    const { repository, issues, loading, filter } = this.state;

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
            onClick={() => this.handleFilter('all')}
            loading={loading ? 1 : 0}
            selected={filter === 'all'}
          >
            {loading ? <FaSpinner color="FFF" size={14} /> : 'All'}
          </FilterButton>
          <FilterButton
            onClick={() => this.handleFilter('open')}
            loading={loading ? 1 : 0}
            selected={filter === 'open'}
          >
            {loading ? <FaSpinner color="FFF" size={14} /> : 'Open'}
          </FilterButton>
          <FilterButton
            onClick={() => this.handleFilter('closed')}
            loading={loading ? 1 : 0}
            selected={filter === 'closed'}
          >
            {loading ? <FaSpinner color="FFF" size={14} /> : 'Closed'}
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
      </Container>
    );
  }
}
export default Repository;
