import styled, { keyframes, css } from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #1890ff;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const FilterBox = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);

  }
`;

export const FilterButton = styled.button.attrs(props => ({
  disabled: props.loading && props.selected === props.filter,
}))`
  background: ${props => (props.selected ? '#1890ff' : '#FFF')};
  color: ${props => (props.selected ? '#FFF' : '#1890ff')};
  font-size: 16px;
  padding: 10px 10px;
  width: 100px;
  margin-left: 10px;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${props => (props.selected ? null : '#1890ff')};
  border-style: solid;

  display: flex;
  justify-content: center;
  align-items: center;

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const PaginationButton = styled.button.attrs(props => ({
  disabled:
    (props.page === 1 && props.type === 'prev') ||
    (props.page === 2 && props.type === 'next'),
}))`
  background: ${props => (props.selected ? '#1890ff' : '#FFF')};
  color: ${props => (props.selected ? '#FFF' : '#1890ff')};
  font-size: 16px;
  padding: 10px 10px;
  margin-left: 10px;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${props => (props.selected ? null : '#1890ff')};
  border-style: solid;

  display: flex;
  justify-content: center;
  align-items: center;

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
  :disabled {
    opacity: 0.4;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 20px;
  border-top: 1px solid #eee;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #1890ff;
        }
      }

      span {
        background: #eee;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;

export const PaginationBox = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
