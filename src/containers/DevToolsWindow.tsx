///<reference path="../../typings/browser.d.ts"/>

import * as React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'

export default createDevTools(
  <LogMonitor />
)
