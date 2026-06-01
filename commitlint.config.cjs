/**
 * Conventional Commits — BLUEPRINT §12.8.
 * type(scope): subject  e.g. feat(hero): add GSAP reveal timeline
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'chore',
        'docs',
        'refactor',
        'perf',
        'style',
        'test',
        'build',
        'ci',
        'revert',
      ],
    ],
    'subject-case': [0],
  },
};
