import type React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { i18n } from '~/i18n'
import { canonizeDomain, deCanonizeDomain } from '~/shared'
import { send } from '~/shared/messaging'
import { Grid, Input, Selector } from '../../shared/components'
import { useSaveSettings, useTitle } from '../../shared/hooks'

const modes = {
  blacklist: { title: i18n('blacklist_mode') },
  whitelist: { title: i18n('whitelist_mode') },
}

export default function Blacklist(): React.JSX.Element {
  useTitle(i18n('blacklist_settings'))

  const saveSettings = useSaveSettings()

  const [mode, setMode] = useState<keyof typeof modes>()
  const [domainsText, setDomainsText] = useState<string>()

  // on component mount
  useEffect(() => {
    send({ settings: undefined }).then(({ settings }) => {
      if (settings instanceof Error) {
        throw settings
      }

      setMode(settings.blacklist.mode)
      setDomainsText([...settings.blacklist.domains].map(deCanonizeDomain).join('\n'))
    })
  }, [])

  return (
    <>
      <h1>{i18n('blacklist_settings')}</h1>
      <p>{i18n('blacklist_settings_hint')}:</p>

      <Grid>
        <Grid.Row>
          <Grid.Column fullWidth>
            <Selector
              variants={modes}
              value={mode}
              onChange={async (newMode) => {
                setMode(newMode)
                await saveSettings({ blacklist: { mode: newMode } }, 350)
              }}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column fullWidth>
            <div style={{ paddingBottom: '0.5em' }}>{i18n('blacklist_domains')}:</div>
            <Input.Textarea
              placeholder="docs.google.com"
              maxLength={2048}
              rows={12}
              value={domainsText}
              onChange={async (text) => {
                setDomainsText(text)
                await saveSettings(
                  { blacklist: { domains: text.split('\n').map(canonizeDomain).filter(Boolean) } },
                  750
                )
              }}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}
