import  gql  from 'graphql-tag';

export default gql`
type ControPanelView{
msg:String
View:String
Controles:String
}

type Query {
    ControPanel:ControPanelView
  }
`