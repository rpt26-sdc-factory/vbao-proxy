module.exports = (services) => `
  <script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
  ${services.map((service) => `<script src="/services/${service}.js"></script>`).join('\n')}

  <script>
    ${services.map((service) => `
      ReactDOM.hydrate(
        React.createElement(${service}),
        document.getElementById(${service.toLowerCase()})
      );
    `)}
  </script>
`;
