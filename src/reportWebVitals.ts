type ReportHandler = (metric: any) => void;

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Performance reporting can be added here if needed
    console.log('Performance metrics will be reported here');
  }
};

export default reportWebVitals;
