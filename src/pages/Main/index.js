import React from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { Form, SubmitButton, List } from './styles';

import Container from '../../components/Container';

class Main extends React.Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({
      newRepo: e.target.value,
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { newRepo } = this.state;

    this.setState({
      loading: true,
    });

    const response = await api.get(`/repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    this.setState(prevState => ({
      repositories: [...prevState.repositories, data],
      newRepo: '',
      loading: false,
    }));
  };

  render() {
    const { newRepo, loading, repositories } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositories
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add repository"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repo => (
            <li key={repo.name}>
              <span>{repo.name}</span>
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                Details
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Main;
