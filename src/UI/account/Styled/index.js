import styled from 'styled-components';

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Error = styled.h2`
  color: #EB5757;
  width: 290px;
`;

export const Success = styled.h2`
  color: #6FCF97;
  width: 290px;
`;
export const Avatar = styled.img`
  heigt:200px;
  width: 200px;
  margin: 0 auto;
  border-radius: 50%;
  cursor: pointer;
`;
export const InputFile = styled.input`
outline: 0;
opacity: 0; 
pointer-events: none;
user-select: none;
position:absolute
`;
export const Label = styled.label`
text-align: center;
`;
export const Group = styled.div`
& Button {
  margin-left: 10px;
}
& Input {
  width: 170px;
}
`;


