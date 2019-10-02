import { Event } from 'benchmark'
import * as median from 'stats-median'
import { CaseResult } from './common-types'

type GetCaseResult = (event: Event) => CaseResult

const getCaseResult: GetCaseResult = (event) => {
  const target = event.target || event

  return {
    name: target.name,
    ops: Math.round(target.hz),
    margin: Number(target.stats.rme.toFixed(2)),
    options: {
      delay: target.delay,
      initCount: target.initCount,
      minTime: target.minTime,
      maxTime: target.maxTime,
      minSamples: target.minSamples,
    },
    samples: target.stats.sample.length,
    promise: target.defer,
    details: {
      min: Math.min(...target.stats.sample),
      max: Math.max(...target.stats.sample),
      mean: target.stats.mean,
      median: median.calc(target.stats.sample),
      standardDeviation: target.stats.deviation,
      marginOfError: target.stats.moe,
      relativeMarginOfError: target.stats.rme,
      standardErrorOfMean: target.stats.sem,
      sampleVariance: target.stats.variance,
      sampleResults: target.stats.sample,
    },
    completed: target.stats.sample.length > 0,
  }
}

export default getCaseResult
