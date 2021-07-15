module.exports = (services) => `
  <script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
  ${Object.keys(services).map((service) => `<script src="public/services/${service}.js"></script>`).join('\n')}

  ${Object.keys(services).map((service) => `
    <script type="module">import ${service} from 'public/services/${service}.js'</script>
    `).join('\n')}

  <script>
    ${Object.keys(services).map((service) => `
      ReactDOM.hydrate(
        React.createElement(${service}),
        document.getElementById('${service}')
      );
    `)}
  </script>
`;
