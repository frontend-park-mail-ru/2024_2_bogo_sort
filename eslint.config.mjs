export default [
  {files: ['**/*.js'],
   languageOptions: {sourceType: 'module'},
  }, {
    ignores: ['**/*precompiled.js', '**/*.runtime.js', 'server/server.js'],
  },
  {
    rules: {
      'camelcase': ['warn', {ignoreDestructuring: true}],
      'semi': ['warn', 'always'], // точки с запятой
      'eol-last': ['warn', 'always'], // Пустая строка в конце файла
      'quotes': ['warn', 'single'], // Одинарные кавычки
      'no-unused-vars': 'off', // Запрет неиспользуемых переменных
      'no-trailing-spaces': 'warn', // Запрет завершающих пробелов
      'no-var': 'warn', // Запрет использования var
      'prefer-const': 'warn', // Предпочтение const
      'no-tabs': 'warn', // Запрет использования табуляции
      'newline-before-return': 'warn', // Перенос строки перед return
      'no-irregular-whitespace': 'warn', // Запрет неправильных пробелов
      'no-multi-spaces': 'warn', // Запрет множественных пробелов
      'no-case-declarations': 'off',
    },
  }
];
