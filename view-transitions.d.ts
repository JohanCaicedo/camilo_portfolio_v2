// View Transition API types (not yet in all TS libs)
interface ViewTransition {
    finished: Promise<void>
    ready: Promise<void>
    updateCallbackDone: Promise<void>
    skipTransition(): void
}

interface Document {
    startViewTransition?(callback: () => void | Promise<void>): ViewTransition
}
