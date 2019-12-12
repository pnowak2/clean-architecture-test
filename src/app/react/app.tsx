import * as React from 'react';

type CardProps = {
  title: string,
  paragraph: string
}
export const App = ({ title, paragraph }: CardProps) => <div>{title}, {paragraph}</div>