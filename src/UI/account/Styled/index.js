import styled from 'styled-components';

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  & h1 {
    margin-top: 20px;
  }
`;

export const Error = styled.h2`
  color: #EB5757;
  width: 290px;
  text-align: center;
`;

export const Success = styled.h2`
  color: #6FCF97;
  width: 290px;
  text-align: center;
`;
export const Avatar = styled.div`
  height: 200px;
  width: 200px;
  margin: 0 auto;
  box-sizing: border-box;
  border-radius: 25px;
  border: 1px dashed;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
`;

export const Group = styled.div`
  display: flex;
  justify-content: space-between;
  & Button {
    margin-left: 10px;
  }
  & Input {
    width: 160px;
  }
`;


