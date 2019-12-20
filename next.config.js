module.exports = {
  publicRuntimeConfig: {
    serverEndpoint: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : '/api/',
    hoursPerWeek: 26,
    visibleWeeks: 18,
    colors: [
      '#A7F3F0',
      '#0B1099',
      '#FFE689',
      '#FA6262',
      '#520E3D',
      '#AF9A32',
    ],
  },
}
