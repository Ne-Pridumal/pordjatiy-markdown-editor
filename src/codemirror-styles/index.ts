import { EditorView, keymap, highlightActiveLine } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import { history, historyKeymap } from '@codemirror/history'
import { indentOnInput } from '@codemirror/language'
import { bracketMatching } from '@codemirror/matchbrackets'
import { lineNumbers, highlightActiveLineGutter } from '@codemirror/gutter'
import { defaultHighlightStyle, HighlightStyle, tags } from '@codemirror/highlight'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { oneDark } from '@codemirror/theme-one-dark'



const transparentTheme = EditorView.theme({
 '&': {
    backgroundColor: 'transparent !important',
    height: '100%',
 },
  '.cm-line': {
    textAlign: 'start',
  },
  '.cm-gutters': {
    backgroundColor: 'rgba(27, 31, 35, 0.45) !important'
  },
  '.cm-activeLine': {
    backgroundColor: 'rgba(27, 31, 35, 0.45) !important'
  },
  '.cm-gutterElement': {
    backgroundColor: 'transparent !important',
  }
})


const syntaxHighlighting = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: '1.6em',
    fontWeight: 'bold'
  },
  {
    tag: tags.heading2,
    fontSize: '1.4em',
    fontWeight: 'bold'
  },
  {
    tag: tags.heading3,
    fontSize: '1.2em',
    fontWeight: 'bold'
  }
])

const CustomMirrorExtensions = [
  keymap.of([...defaultKeymap, ...historyKeymap]),
  lineNumbers(),
  highlightActiveLineGutter(),
  history(),
  indentOnInput(),
  bracketMatching(),
  defaultHighlightStyle.fallback,
  highlightActiveLine(),
  markdown({
    base: markdownLanguage,
    codeLanguages: languages,
    addKeymap: true
  }),
  oneDark,
  transparentTheme,
  syntaxHighlighting,
  EditorView.lineWrapping,
]

export default CustomMirrorExtensions
