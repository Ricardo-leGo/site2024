import  gql  from 'graphql-tag';

export default gql`
  
  input UserLogin{
    Password:String
    User:String
  }
  type User{
  Name:String
  LastName:String
  Rol:String
  IdUser:Int
  }

  type Token{
    Token:String
  }

type Query {
    Login(UserLogin:UserLogin):Token
  }
`