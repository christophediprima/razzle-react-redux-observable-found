import { createRenderer } from 'fela';

const rule = (props: any) => ({
  backgroundColor: 'red',
  color: 'blue',
  fontSize: props.size,
});

export default () => {
  const renderer = createRenderer();

  renderer.renderStatic(
    {
      fontFamily: 'Lato',
      height: '100%',
      margin: 0,
      padding: 0,
      width: '100%',
    },
    'html,body,#app',
  );

  renderer.renderStatic({ display: 'flex' }, 'div');

  renderer.renderRule(rule, { size: '12px' });

  return renderer;
};
