export class Plant {
    constructor(data) {
        this.id = data.id;
        this.plantId = data.plant_id;
        this.location = data.location;
        this.mycorrhiza = data.mycorrhiza || false;
        this.averageWateringInterval = data.average_watering_interval;
        this.wateringLogs = data.watering_logs || [];
        this.plant = data.plant;
        this.next_watering_date = data.next_watering_date;
    }

    get scientificName() {
        return this.plant?.scientific_name || "N/A";
    }

    get commonName() {
        return this.plant?.common_name || "N/A";
    }

    get formattedAverageInterval() {
        return this.averageWateringInterval
            ? `${Number(this.averageWateringInterval).toFixed(1)}d`
            : "";
    }

    get warningThreshold() {
        return this.averageWateringInterval || parseInt(process.env.NEXT_PUBLIC_DEFAULT_WARNING_THRESHOLD || '7');
    }

    get dangerThreshold() {
        const multiplier = parseFloat(process.env.NEXT_PUBLIC_DEFAULT_DANGER_THRESHOLD_MULTIPLIER || '2');
        return this.averageWateringInterval 
            ? this.averageWateringInterval * multiplier 
            : this.warningThreshold * multiplier;
    }

    getLastWateringDate() {
        if (!this.wateringLogs || this.wateringLogs.length === 0) {
            return null;
        }

        const sortedLogs = [...this.wateringLogs].sort((a, b) =>
            new Date(b.watering_date) - new Date(a.watering_date)
        );

        return new Date(sortedLogs[0].watering_date);
    }

    static fromJSON(json) {
        return new Plant(json);
    }
} 