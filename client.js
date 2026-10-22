window.__ModuleLoader__.load({
  id: 'dsh-cyber-vape',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const STYLE_ID = 'cv-style'

    const CSS = [
      '.cv-vape{position:relative;flex:0 0 auto;width:26px;height:56px;margin-top:2px;',
      'user-select:none;pointer-events:none;}',
      '.cv-vape svg{display:block;overflow:visible;}',
      '.cv-vape .cv-tip{transition:fill .25s ease;}',
      '.cv-vape.on .cv-tip{animation:cv-ember 2.1s ease-in-out infinite;}',
      '@keyframes cv-ember{0%,100%{opacity:.55}45%{opacity:1}70%{opacity:.75}}',
      '.cv-vape .cv-puff{position:absolute;left:11px;top:0;width:6px;height:6px;',
      'border-radius:50%;background:rgba(196,196,190,.5);opacity:0;}',
      '.cv-vape.on .cv-puff{animation:cv-smoke 2.8s ease-out infinite;}',
      '.cv-vape.on .cv-puff.d2{animation-delay:.9s;}',
      '.cv-vape.on .cv-puff.d3{animation-delay:1.8s;}',
      '@keyframes cv-smoke{0%{opacity:0;transform:translate(0,0) scale(.45)}',
      '16%{opacity:.55}100%{opacity:0;transform:translate(-9px,-32px) scale(2.1)}}',
    ].join('')

    function ensureStyle() {
      if (typeof document === 'undefined') return
      if (document.getElementById(STYLE_ID)) return
      const s = document.createElement('style')
      s.id = STYLE_ID
      s.textContent = CSS
      document.head.appendChild(s)
    }

    function Cigarette(props) {
      const on = !!props.running
      return h(
        'div',
        { className: on ? 'cv-vape on' : 'cv-vape', 'aria-hidden': 'true' },
        h(
          'svg',
          { width: 26, height: 56, viewBox: '0 0 26 56', xmlns: 'http://www.w3.org/2000/svg' },
          // 烟灰（燃烧端，灰白屑）
          h('rect', { x: 8.5, y: 1.5, width: 9, height: 2.5, rx: 1, fill: '#b9b3a8' }),
          // 燃烧的火头
          h('rect', { className: 'cv-tip', x: 8.5, y: 4, width: 9, height: 5, fill: on ? '#ff5a2b' : '#6b2a18' }),
          // 烟身（米白纸）
          h('rect', { x: 8.5, y: 9, width: 9, height: 30, fill: '#f2efe6' }),
          // 烟身左侧阴影，做出圆柱
          h('rect', { x: 8.5, y: 9, width: 1.6, height: 30, fill: '#e0dccf' }),
          // 滤嘴接缝
          h('rect', { x: 8.5, y: 38, width: 9, height: 1.2, fill: '#a8841c' }),
          // 滤嘴（棕黄）
          h('rect', { x: 8.5, y: 39, width: 9, height: 13, rx: 1, fill: '#c9a227' }),
          // 滤嘴阴影
          h('rect', { x: 8.5, y: 39, width: 1.6, height: 13, fill: '#b08f1f' })
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
        h(Cigarette, { running: props.running }),
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
