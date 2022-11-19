import axios from 'axios';

import { HOST_URL } from '@data/url';

class ApplyServices {
  async apply(courseCode: string, setLoadingToApply: (value: boolean) => void) {
    try {
      setLoadingToApply(true);
      const request = {
        course: courseCode,
      };
      const response = await axios.post(
        `${HOST_URL}/course/apply`,
        JSON.stringify(request),
      );
    } catch (e) {
      Error();
    } finally {
      setLoadingToApply(false);
    }
  }
  async withDrawal(
    courseCode: string,
    setLoadingToApply: (value: boolean) => void,
  ) {
    try {
      setLoadingToApply(true);
      const response = await axios.delete(
        `${HOST_URL}/course/apply/?course=${courseCode}`,
      );
    } catch (e) {
      Error();
    } finally {
      setLoadingToApply(false);
    }
  }
}

export const dataServices = new ApplyServices();
