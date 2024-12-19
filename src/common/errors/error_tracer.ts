export class ErrorTracer {
  currentController: string;
  currentService: string;
  currentMethod: string;
  currentStep: string;
  constructor(currentController: string, currentService: string, currentMethod: string, currentStep: string) {
    this.currentController = currentController;
    this.currentService = currentService;
    this.currentMethod = currentMethod;
    this.currentStep = currentStep;
  }
}
