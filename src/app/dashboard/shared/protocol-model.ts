export class Protocol {
    protocol_name: string;
    files: File[];

    constructor(protocol_name: string, files: File[]) {
      this.protocol_name = protocol_name;
      this.files = files;
    }
}
