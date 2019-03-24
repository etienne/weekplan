module.exports = {
  publicRuntimeConfig: {
    serverEndpoint: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
    hoursPerWeek: 24,
    visibleWeeks: 12,
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
