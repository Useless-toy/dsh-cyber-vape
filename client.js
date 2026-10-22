window.__ModuleLoader__.load({
  id: '@local/dsh-cyber-vape',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const STYLE_ID = 'cv-style'

    const CSS = [
      '.cv-vape{position:relative;flex:0 0 auto;width:26px;height:56px;margin-top:2px;',
      'user-select:none;pointer-events:none;}',
      '.cv-vape svg{display:block;overflow:visible;}',
      '.cv-vape .cv-tip{transition:fill .25s ease;}',
      '.cv-vape.on .cv-tip{animation:cv-ember 1.9s ease-in-out infinite;}',
      '@keyframes cv-ember{0%,100%{opacity:.5}50%{opacity:1}}',
      '.cv-vape .cv-puff{position:absolute;left:14px;top:2px;width:5px;height:5px;',
      'border-radius:50%;background:rgba(206,212,230,.55);opacity:0;}',
      '.cv-vape.on .cv-puff{animation:cv-smoke 2.6s ease-out infinite;}',
      '.cv-vape.on .cv-puff.d2{animation-delay:.85s;}',
      '.cv-vape.on .cv-puff.d3{animation-delay:1.7s;}',
      '@keyframes cv-smoke{0%{opacity:0;transform:translate(0,0) scale(.5)}',
      '18%{opacity:.6}100%{opacity:0;transform:translate(-7px,-30px) scale(1.9)}}',
    ].join('')

    function ensureStyle() {
      if (typeof document === 'undefined') return
      if (document.getElementById(STYLE_ID)) return
      const s = document.createElement('style')
      s.id = STYLE_ID
      s.textContent = CSS
      document.head.appendChild(s)
    }

    function Vape(props) {
      const on = !!props.running
      return h(
        'div',
        { className: on ? 'cv-vape on' : 'cv-vape', 'aria-hidden': 'true' },
        h(
          'svg',
          { width: 26, height: 56, viewBox: '0 0 26 56', xmlns: 'http://www.w3.org/2000/svg' },
          h('rect', { x: 10, y: 13, width: 7, height: 38, rx: 2, fill: '#3a3f4b' }),
          h('rect', { x: 11, y: 9, width: 5, height: 7, rx: 1, fill: '#22262e' }),
          h('rect', { className: 'cv-tip', x: 8.5, y: 4, width: 10, height: 6, rx: 2, fill: on ? '#ff8a4c' : '#463a35' }),
          h('rect', { x: 10.5, y: 49, width: 6, height: 5, rx: 2, fill: '#15181d' })
        ),
        on ? h('span', { className: 'cv-puff' }) : null,
        on ? h('span', { className: 'cv-puff d2' }) : null,
        on ? h('span', { className: 'cv-puff d3' }) : null
      )
    }

    function ReasoningBody(props) {
      const text = typeof props.text === 'string' ? props.text : ''
      return h(
        'div',
        { style: { display: 'flex', alignItems: 'flex-start', gap: '8px' } },
        h(Vape, { running: props.running }),
        h('div', { style: { whiteSpace: 'pre-wrap', flex: '1 1 auto', minWidth: 0 } }, text)
      )
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        ensureStyle()
        ctx.slots.inject('conversation.chat.reasoning.body', function () {
          return ctx.slots.register(
            {
              name: 'conversation.chat.reasoning.body',
              id: 'cyber-vape',
              priority: 50,
            },
            ReasoningBody
          )
        })
      },
    }
  },
})
