import React from 'react'

import { useTrail, animated } from 'react-spring'
import Translate, { translate } from '@docusaurus/Translate'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Link from '@docusaurus/Link'
import HeroLight from './img/hero_light.svg'
import HeroDark from './img/hero_dark.svg'
import GithubIcon from '@site/static/icons/github.svg'
import JuejinIcon from '@site/static/icons/juejin.svg'
import RssIcon from '@site/static/icons/rss.svg'
import QqIcon from '@site/static/icons/qq.svg'
import WxIcon from '@site/static/icons/wx.svg'
import CsdnIcon from '@site/static/icons/csdn.svg'
import CloudMusicIcon from '@site/static/icons/cloud-music.svg'
import useBaseUrl from '@docusaurus/useBaseUrl'
import Button from '../Button'
import styles from './styles.module.css'
import {useColorMode} from '@docusaurus/theme-common';

function Hero() {
  const {colorMode} = useColorMode();
  const {
    // 当前语言
    i18n: { currentLocale },
  } = useDocusaurusContext()

  // animation
  const animatedTexts = useTrail(5, {
    from: { opacity: 0, transform: 'translateY(3em)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: {
      mass: 3,
      friction: 45,
      tension: 460,
    },
  })

  return (
    <animated.div className={styles.hero}>
      <div className={styles.bloghome__intro}>
        <animated.div style={animatedTexts[0]} className={styles.hero_text}>
          <Translate description='hero greet'>Hello! I'm </Translate>
          <span className={styles.intro__name}>
            <Translate description='my name'>Qi Zhang</Translate>
          </span>
        </animated.div>
        <animated.p style={animatedTexts[1]}>
          <Translate
            id='homepage.hero.text'
            description='hero text'
          >
            {`一名运维攻城狮，记录工作中遇到的问题，钻研各类云原生产品并分享给大家。`}
          </Translate>
        </animated.p>
        {/* {currentLocale === 'en' && (
          <animated.p style={animatedTexts[3]}>
            <Translate id='homepage.qqgroup1' description='qq group1'>
              QQ 群：5478458
            </Translate>
          </animated.p>
        )} */}
        <SocialLinks animatedProps={animatedTexts[4]} />
        {
          <animated.div style={animatedTexts[2]}>
            <Button isLink href={'./about'}>
              <Translate description='follow me btn text'>自我介绍</Translate>
            </Button>
          </animated.div>
        }
      </div>
      <animated.div style={animatedTexts[2]} className={styles.bloghome__image}>
        { colorMode === 'light' ? <HeroLight/> : null}
        { colorMode === 'dark' ? <HeroDark/> : null}
      </animated.div >
    </animated.div>
  )
}

function SocialLinks({ animatedProps, ...props }) {
  return (
    <animated.div className={styles.social__links} style={animatedProps}>
      <a href='https://github.com/zzzhangqi' target='_blank'>
        <GithubIcon />
      </a>
    </animated.div>
  )
}


export default Hero
