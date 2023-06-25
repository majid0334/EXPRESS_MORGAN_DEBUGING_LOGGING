import { gql } from "@apollo/client";

export const GET_ALL_LEARNING_PATHS = gql`
  {
    learningPaths {
      id
      title
      decsription
      estimatedHours
      steps {
        id
        title
        done
        description
        link
        comment
      }
    }
  }
`;

/* export const GET_ALL_LEARNING_PATHS = gql; */
