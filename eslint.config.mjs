import antfu from '@antfu/eslint-config';

export default antfu({
	nextjs: true,
	typescript: true,
	jsonc: false,
	yaml: false,

	rules: {
		'antfu/top-level-function': 'off',
		'ts/consistent-type-definitions': 'off',
		'style/arrow-parens': ['error', 'always'],

		'style/no-tabs': 'off',
		'style/jsx-quotes': ['error', 'prefer-single'],
		'style/jsx-indent-props': ['error', 'tab'],
		'style/indent': ['off', 'tab'],
		'style/indent-binary-ops': ['off', 'tab'],
	},
	stylistic: {
		semi: true,
	},
});
